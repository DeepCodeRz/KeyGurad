from flask import Flask, render_template, request, redirect, url_for, jsonify
import random
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

# Resources of the password that will be created by randomly choosing.
uppercase_list = "QWERTYUIOPASDFGHJKLZXCVBNM"
lowercase_list = "qwertyuiopasdfghjklzxcvbnm"
numbers_list = "0123456789"
special_list = "!#$%&()*+-./:;<=>?"

# Rendering web template for Front-End.
@app.route('/')
def home():
    return render_template('index.html')

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

if __name__ == '__main__':
    app.run(debug=True, port=5004)