INSERT INTO
  departments (id, name)
VALUES
  (1, 'Human Resources'),
  (2, 'Finance'),
  (3, 'Tech Support'),
  (4, 'Customer Support'),
  (5, 'Janitorial');
INSERT INTO
  roles (id, title, salary, department_id)
VALUES
  (1, 'Human resources director', '90000', 1),
  (2, 'Customer success engineer', '80000', 4),
  (3, 'Cleanliness specialist', '100000', 5),
  (4, 'Lead financial advisor', '120000', 2),
  (5, 'Lead tech support', '200000', 3),
  (6, 'Receptionist', '45000', 4),
  (7, 'Recruiter', '85000', 1);
INSERT INTO
  employees (id, first_name, last_name, role_id, manager_id)
VALUES
  (1, 'Larrey', 'Biff', 2, 4),
  (2, 'Ken', 'Mcelroy', 1, 1),
  (3, 'Jeff', 'Hagen', 6, 4),
  (4, 'Kayla', 'Preston', 4, 2),
  (5, 'Marissa', 'Leo', 7, 1),
  (6, 'Henry', 'Rollins', 3, 5);