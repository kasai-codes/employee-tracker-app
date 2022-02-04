These are all functions:


Think through CRUD. what statement am i gonna need to CREATE an employee. 
Present user with options

----------------------------------------------------------------------------

[These will all be - READ - 'SELECT * FROM [table_name]';

Veiw all deparments

Veiw all employees

Veiw all roles.]

---------------------------------------------------------------------------

[These will be CREATE - 'INSERT INTO  [tables_name] (col-1, col-2) VALUES (val-1, val-2)' i.e INSERT INTO deparments 

Add a deparments

Add a role

SELECT the existing roles out for the 'roles' tables

.map() the results from 'roles' to questions data for inquirer(get our results in a good format for inquirer)

THEN prompt the user for the role info. (inquirer)

    - take the user's answers and go INSERT them into the 'role tables

Add an employee

Update an employee]


Make the call, then AWAIT. 