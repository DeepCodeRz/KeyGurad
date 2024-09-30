from crypt import methods

from flask import Flask, render_template, request, jsonify
import random
import sqlite3

"""insert_query = '''
INSERT INTO password_info (website, username, password, previous_ver)
VALUES (?, ?, ?, ?)
'''

c.execute(insert_query, ('example.com', 'user123', 'password123', None))

conn.commit()

select_query = 'SELECT * FROM password_info'
c.execute(select_query)

rows = c.fetchall()
for row in rows:
    print(row)

conn.close()"""
app = Flask(__name__)

user_id = ""
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/checkUser', methods=['POST', 'GET'])
def checkUser():
    global user_id

    data = request.get_json()
    user_id = data['userId']
    password = data['password']

    conn = sqlite3.connect('identifier.sqlite')
    c = conn.cursor()

    checkUserQ = '''SELECT COUNT(user_id) FROM users WHERE user_id = ? AND password = ?'''
    c.execute(checkUserQ, (user_id, password))

    userResult = c.fetchone()[0]

    conn.close()

    if userResult == 1:
        return jsonify({"userResult": "True"})
    else:
        return jsonify({"userResult": "False"})



@app.route('/startApp', methods=['POST', 'GET'])
def startApp():
    conn = sqlite3.connect('identifier.sqlite')
    c = conn.cursor()
    print(user_id)

    loadPasswordsQ = '''SELECT password_id, website, username, password FROM password_info WHERE user_id = ?'''

    c.execute(loadPasswordsQ, (user_id,))
    userPasswords = c.fetchall()

    print(userPasswords)

    return render_template('app.html', userPasswords = userPasswords)

# Resources of the password that will be created by randomly choosing.
uppercase_list = "QWERTYUIOPASDFGHJKLZXCVBNM"
lowercase_list = "qwertyuiopasdfghjklzxcvbnm"
numbers_list = "0123456789"
special_list = "!#$%&()*+-./:;<=>?"

@app.route('/addNewPassword', methods=['POST'])
def addNewPassword():
    conn = sqlite3.connect('identifier.sqlite')
    c = conn.cursor()

    data = request.json
    website = data['website']
    username = data['username']
    password = data['password']

    insert_query = '''
    INSERT INTO password_info (user_id, website, username, password)
    VALUES (?, ?, ?, ?)
    '''

    c.execute(insert_query, (user_id, website, username, password))
    conn.commit()

    id_query = '''SELECT password_id FROM password_info ORDER BY password_id DESC LIMIT 1;'''
    c.execute(id_query)

    password_id = c.fetchone()[0]
    conn.close()

    return jsonify({'password_id': password_id})

@app.route('/editPassword', methods=['POST'])
def editPassword():
    conn = sqlite3.connect('identifier.sqlite')
    c = conn.cursor()

    data = request.json
    password_id = data['password_id']
    website = data['editedWebsite']
    username = data['editedUsername']
    password = data['editedPassword']

    updateQuery = '''UPDATE password_info SET website = ?, username = ?, password = ? WHERE password_id = ?'''

    c.execute(updateQuery, (website, username, password, password_id))
    conn.commit()
    conn.close()

@app.route('/deletePassword', methods=['POST'])
def deletePassword():
    conn = sqlite3.connect('identifier.sqlite')
    c = conn.cursor()

    data = request.get_json()
    password_id = data.get('password_id')

    delete_query = '''DELETE FROM password_info WHERE password_id = ?'''

    c.execute(delete_query, (password_id,))
    conn.commit()

    conn.close()

    return jsonify({'password deleted': True})

@app.route('/searchPassword', methods=['GET'])
def searchPassword():
    conn = sqlite3.connect('identifier.sqlite')
    c = conn.cursor()

    getIdsQuery = '''SELECT password_id FROM password_info ORDER BY password_id DESC;'''

    c.execute(getIdsQuery)
    rows = c.fetchall()

    ids = [item[0] for item in rows]

    conn.close()

    return jsonify({'passwords': ids})


# Getting needed options data via JavaScript to create the passwords with right criteria.
@app.route('/options', methods=['POST'])
def options():
    data = request.json
    length = int(data['length'])
    uppercase = data['uppercase']
    lowercase = data['lowercase']
    numbers = data['numbers']
    special = data['special']
    keyword = data['keyword']

    settings = [uppercase, lowercase, numbers, special]

    # Finding how many characters wil be from every list.
    true = 0
    for i in settings:
        if i:
            true += 1

    percentage = int(round(((length - len(keyword)) / true), 0)) # Dividing password length (except keyword) with selected option number to find number of character from every option.

    # Defining the password as a free list to change afterward.
    password = []

    # Adding characters to the password by number that found before.
    if uppercase:
        password += random.choices(uppercase_list, k=percentage)
    if lowercase:
        password += random.choices(lowercase_list, k=percentage)
    if numbers:
        password += random.choices(numbers_list, k=percentage)
    if special:
        password += random.choices(special_list, k=percentage)

    # Transforming keyword value to a list to merge the password.
    keyword = list(keyword)
    print(keyword)

    # Reformatting the keyword according to criteria that received from the user.
    for i in range(len(keyword)):
        print(i)
        if keyword[i].isalpha(): # Checking if keyword is in alphabet.
            if uppercase and lowercase: # Keyword will be randomly upper/lowercased if both uppercase and lowercase selected by user.
                if random.choice([True, False]):
                    keyword[i] = keyword[i].upper()
                else:
                    keyword[i] = keyword[i].lower()

                # Defining variables to store case situation to change them if all characters become upper/lowercase
                case = ""

                for k in list(keyword): # Every character will be checked to understand is all characters upper/lowercase.
                    for j in uppercase_list:
                        if k != j:
                            case += "Lowercase"
                        else:
                            case += "Uppercase"

                # A random character will be upper/lowercased if there is no upper/lowercase in the keyword.
                if "Lowercase" not in case:
                    random.choice(list(keyword)).lower()
                elif "Uppercase" not in case:
                    random.choice(list(keyword)).upper()


            elif uppercase: # Keyword will be uppercased if user only selected uppercase option.
                keyword[i] = keyword[i].upper()
            elif lowercase: # Keyword will be lowercased if user only selected uppercase option.
                keyword[i] = keyword[i].lower()

    random.shuffle(password) # Randomizing the password.

    password += keyword # Adding keyword to password.

    # Fixing if password length doesn't match with excepted length.
    while len(password) != length:
        if len(password) < length:
            if uppercase:
                password += random.choices(uppercase_list, k=1)
            elif lowercase:
                password += random.choices(lowercase_list, k=1)
            elif numbers:
                password += random.choices(numbers_list, k=1)
            elif special:
                password += random.choices(special_list, k=1)
        elif len(password) > length:
            password.remove(random.choice(password))


    # ----- TESTS -----

    # Defining a variable to store test results.
    test_results = []

    if len(password) == length: # Testing password length.
        test_results.append("Length test passed!")
    else:
        test_results.append("Length test failed!")

    if uppercase: # Testing uppercases if uppercase option selected by user.
        for i in password:
            if i.isupper():
                test_results.append("Uppercase test passed!")
                break

        if "Uppercase test passed!" not in test_results:
            test_results.append("Uppercase test failed!")
    else: # Testing uppercases if uppercase option not selected by user.
        for i in password:
            if i.isupper():
                test_results.append("Uppercase test failed!")
                break

        if "Uppercase test failed!" not in test_results:
            test_results.append("Uppercase test passed!")

    if lowercase: # Testing lowercases if lowercase option selected by user.
        for i in password:
            if i.islower():
                test_results.append("Lowercase test passed!")
                break

        if "Lowercase test passed!" not in test_results:
            test_results.append("Lowercase test failed!")
    else: # Testing lowercases if lowercases option not selected by user.
        for i in password:
            if i.islower():
                test_results.append("Lowercase test failed!")
                break

        if "Lowercase test failed!" not in test_results:
            test_results.append("Lowercase test passed!")

    if numbers: # Testing numbers if uppercase numbers selected by user.
        for i in password:
            if i.isdigit():
                test_results.append("Number test passed!")
                break

        if "Number test passed!" not in test_results:
            test_results.append("Number test failed!")
    else: # Testing numbers if numbers option not selected by user.
        for i in password:
            if i.isdigit():
                test_results.append("Number test failed!")
                break

        if "Number test failed!" not in test_results:
            test_results.append("Number test passed!")

    if special: # Testing special characters if special characters option selected by user.
        for i in password:
            if "Special character test passed!" not in test_results:
                for j in special_list:
                    if i == j:
                        test_results.append("Special character test passed!")
                        break

        if "Special character test passed!" not in test_results:
            test_results.append("Special character test failed!")
    else: # Testing special characters if uppercase special characters not selected by user.
        for i in password:
            if "Special character test failed!" not in test_results:
                for j in special_list:
                    if i == j:
                        test_results.append("Special character test failed!")
                        break

        if "Special character test failed!" not in test_results:
            test_results.append("Special character test passed!")


    for i in test_results: # Sending error message to front-end if there are any failed tests in the test result.
        if i == "Length test failed!" or i == "Uppercase test failed!" or i == "Lowercase test failed!" or i == "Number test failed!" or i == "Special character test failed!":
            return jsonify({"error1": "Your current options/keyword combination is not able to create a password! Please change the keyword or options. "})


    print(test_results)
    password = (" ".join(password).replace(" ", "")) # Password will be reformatted to be readable.

    return jsonify({'password': password}) # Password will be sent to Front-End.

@app.route('/checkCommonPassword', methods=['POST'])
def checkCommonPassword():
    data = request.get_json()
    passwordToAnalyze = data['passwordToAnalyze']

    print(passwordToAnalyze)

    conn = sqlite3.connect('identifier.sqlite')
    c = conn.cursor()

    getCommonQ = '''SELECT password FROM common_passwords;'''
    c.execute(getCommonQ)

    rows = c.fetchall()
    conn.close()

    isCommon = passwordToAnalyze in {item[0] for item in rows}

    if isCommon:
        return jsonify({'true': "true"})
    else:
        return jsonify({'false': "false"})


if __name__ == '__main__':
    app.run(debug=True, port=5003)