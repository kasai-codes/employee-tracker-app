
INSERT INTO departments (id, name)
VALUES (1, 'Finance'),
       (2, 'Sales'),
       (3, 'Customer Support'),
       (4, 'Tech'),
       (5, 'Reception'),
       (6, 'Leadership');

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, 'Senior finance advisor', '130000', 1),
       (2, 'Lead Tech', '120000', 2),
       (3, 'Receptionist', '40000', 5),
       (4, 'Junior finance advisor', '90000', 1),
       (5, 'Office Manager', '70000', 5),
       (6, 'Sales Manager', '140000', 2),
       (7, 'Sales Rep', '60000', 2);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Gary', 'Ridgeway', 6, 1),
       (2, 'Lee', 'Oswald', 7, 1),
       (3, 'Richard', 'Ramirez', 5, 3),
       (4, 'Jeff', 'Dahmer', 7, 1),
       (5, 'Ruby', 'Onrails', 3, 3),
       (6, 'Ted', 'Bundy', 1, 6);

