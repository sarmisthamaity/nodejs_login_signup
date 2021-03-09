## nodejs_login_signup

### sign up

  - Sign up means register or to creat a account.
  - In this project first step is that, user have to choose what she/he wants to do sign up or log in.
  - If user will choose sign up first it will creat a account.
  - For creating an account it will ask for username.for taking user input i used here readline sync.it's a module,
    we have to require this module for using.
  - After that it will ask for password and password should contain one special charecter,number 
    and length should be greater than equal 8 or less than equal 16.
  - Otherwise it will tell you that password is not valid.
  - If password fullfill all this condition then that person can creat an account.
  - After creating the account it will ask for description means it will ask for abuot yourself,
    hobby, date of birth .
  - After sign up if again user given the same name it will show user is exits.
 
### log in 

  - If i have signed up first than i can log in for that account.
  - For log in it will ask for user name and password if user name and password both are same than i can log in.
  - Other wise it will show you first you have to signed up.
  - If user name and password both are same than it will show, succesfully logged in.
  - After log in it will show the user profile.

###  used here
  - Promise.
  - readFilesync and writeFilesync.
  - Es6 format(arrow function).
  - For checking password i made function.
  
