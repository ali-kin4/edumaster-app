-- EduMaster Database Seed Data
-- Run this after creating the schema to populate with initial course data

-- Insert Courses
INSERT INTO courses (id, title, description, category, icon, difficulty_level, estimated_hours, total_lessons, rating, is_published) VALUES
-- Microsoft Office Suite
('550e8400-e29b-41d4-a716-446655440001', 'Microsoft Excel', 'Master spreadsheets, formulas, pivot tables, and data analysis.', 'microsoft', '📊', 'beginner', 8, 15, 4.9, true),
('550e8400-e29b-41d4-a716-446655440002', 'Microsoft Word', 'Document creation, formatting, templates, and collaboration.', 'microsoft', '📝', 'beginner', 6, 12, 4.8, true),
('550e8400-e29b-41d4-a716-446655440003', 'Microsoft PowerPoint', 'Create stunning presentations with animations and transitions.', 'microsoft', '🎯', 'beginner', 5, 10, 4.7, true),

-- Google Workspace
('550e8400-e29b-41d4-a716-446655440004', 'Google Sheets', 'Cloud-based spreadsheets with real-time collaboration.', 'google', '📈', 'beginner', 7, 14, 4.9, true),
('550e8400-e29b-41d4-a716-446655440005', 'Google Docs', 'Collaborative document editing and sharing.', 'google', '📄', 'beginner', 5, 10, 4.8, true),
('550e8400-e29b-41d4-a716-446655440006', 'Google Drive', 'File storage, sharing, and team collaboration.', 'google', '☁️', 'beginner', 4, 8, 4.7, true),

-- Accounting
('550e8400-e29b-41d4-a716-446655440007', 'Bookkeeping Basics', 'Fundamental accounting principles and practices.', 'accounting', '📒', 'beginner', 12, 20, 4.9, true),
('550e8400-e29b-41d4-a716-446655440008', 'QuickBooks', 'Master QuickBooks for business accounting.', 'accounting', '💳', 'intermediate', 10, 18, 4.8, true),
('550e8400-e29b-41d4-a716-446655440009', 'Financial Analysis', 'Financial statements, ratios, and business analysis.', 'accounting', '💹', 'advanced', 9, 15, 4.9, true),

-- Programming
('550e8400-e29b-41d4-a716-446655440010', 'Python Programming', 'Learn Python from basics to advanced concepts.', 'programming', '🐍', 'beginner', 15, 25, 5.0, true),
('550e8400-e29b-41d4-a716-446655440011', 'Web Development', 'HTML, CSS, JavaScript and modern frameworks.', 'programming', '🌐', 'intermediate', 20, 30, 4.9, true),
('550e8400-e29b-41d4-a716-446655440012', 'Database & SQL', 'Database design and SQL query mastery.', 'programming', '🗄️', 'intermediate', 10, 16, 4.8, true),

-- Design
('550e8400-e29b-41d4-a716-446655440013', 'Adobe Photoshop', 'Photo editing and digital art creation.', 'design', '🎨', 'beginner', 12, 20, 4.9, true),
('550e8400-e29b-41d4-a716-446655440014', 'Adobe Illustrator', 'Vector graphics and logo design.', 'design', '✨', 'intermediate', 10, 18, 4.8, true),
('550e8400-e29b-41d4-a716-446655440015', 'UI/UX Design', 'User interface and experience design principles.', 'design', '📱', 'intermediate', 14, 22, 5.0, true),

-- Marketing
('550e8400-e29b-41d4-a716-446655440016', 'Digital Marketing', 'SEO, SEM, and online marketing strategies.', 'marketing', '📢', 'beginner', 10, 16, 4.9, true),
('550e8400-e29b-41d4-a716-446655440017', 'Social Media Marketing', 'Master social media platforms for business growth.', 'marketing', '👥', 'beginner', 8, 14, 4.8, true),
('550e8400-e29b-41d4-a716-446655440018', 'Content Marketing', 'Create compelling content that converts.', 'marketing', '✍️', 'intermediate', 7, 12, 4.7, true);

-- Insert sample lessons for Microsoft Excel course
INSERT INTO lessons (course_id, title, description, duration_minutes, order_index, is_published) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Introduction to Microsoft Excel', 'Getting started with Excel interface and basic navigation', 15, 1, true),
('550e8400-e29b-41d4-a716-446655440001', 'Basic Formulas and Functions', 'Learn SUM, AVERAGE, COUNT and other essential functions', 45, 2, true),
('550e8400-e29b-41d4-a716-446655440001', 'Working with Data', 'Data entry, formatting, and basic data manipulation', 30, 3, true),
('550e8400-e29b-41d4-a716-446655440001', 'Charts and Graphs', 'Creating visual representations of your data', 40, 4, true),
('550e8400-e29b-41d4-a716-446655440001', 'PivotTables Mastery', 'Advanced data analysis with PivotTables', 60, 5, true);

-- Insert sample lessons for Python Programming course
INSERT INTO lessons (course_id, title, description, duration_minutes, order_index, is_published) VALUES
('550e8400-e29b-41d4-a716-446655440010', 'Python Basics', 'Variables, data types, and basic syntax', 30, 1, true),
('550e8400-e29b-41d4-a716-446655440010', 'Control Structures', 'If statements, loops, and conditional logic', 45, 2, true),
('550e8400-e29b-41d4-a716-446655440010', 'Functions and Modules', 'Creating reusable code with functions', 50, 3, true),
('550e8400-e29b-41d4-a716-446655440010', 'Data Structures', 'Lists, dictionaries, sets, and tuples', 60, 4, true),
('550e8400-e29b-41d4-a716-446655440010', 'Object-Oriented Programming', 'Classes, objects, and inheritance', 75, 5, true);

-- Insert sample flashcards for Excel course
INSERT INTO flashcards (course_id, term, definition, difficulty_level, order_index) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'VLOOKUP', 'A function that searches for a value in the first column of a range and returns a value in the same row from another column', 'medium', 1),
('550e8400-e29b-41d4-a716-446655440001', 'PivotTable', 'A data summarization tool that can automatically sort, count, and sum data stored in a table', 'hard', 2),
('550e8400-e29b-41d4-a716-446655440001', 'Absolute Reference', 'A cell reference that does not change when copied to other cells (uses $ symbol)', 'medium', 3),
('550e8400-e29b-41d4-a716-446655440001', 'Conditional Formatting', 'A feature that changes the appearance of cells based on conditions you specify', 'easy', 4);

-- Insert sample flashcards for Python course
INSERT INTO flashcards (course_id, term, definition, difficulty_level, order_index) VALUES
('550e8400-e29b-41d4-a716-446655440010', 'List Comprehension', 'A concise way to create lists by iterating over an iterable and optionally applying conditions', 'medium', 1),
('550e8400-e29b-41d4-a716-446655440010', 'Lambda Function', 'A small anonymous function that can have any number of arguments but can only have one expression', 'medium', 2),
('550e8400-e29b-41d4-a716-446655440010', 'Decorator', 'A function that takes another function and extends its functionality without modifying it', 'hard', 3),
('550e8400-e29b-41d4-a716-446655440010', 'Exception Handling', 'The process of catching and handling errors that occur during program execution', 'easy', 4);

-- Insert sample quizzes
INSERT INTO quizzes (id, course_id, title, description, total_questions, time_limit_minutes, passing_score) VALUES
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Excel Fundamentals Quiz', 'Test your knowledge of basic Excel concepts', 5, 15, 70),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440010', 'Python Basics Quiz', 'Test your understanding of Python fundamentals', 5, 20, 70);

-- Insert sample quiz questions for Excel quiz
INSERT INTO quiz_questions (quiz_id, question, question_type, options, correct_answer, explanation, points, order_index) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'What is the primary purpose of a PivotTable in Excel?', 'multiple_choice', 
 '["Formatting data", "Summarizing large datasets", "Creating charts", "Writing macros"]', 
 'Summarizing large datasets', 'PivotTables are powerful tools for summarizing and analyzing large amounts of data', 1, 1),
('660e8400-e29b-41d4-a716-446655440001', 'Which function is used to find the average of a range in Excel?', 'multiple_choice',
 '["=SUM()", "=MEAN()", "=AVERAGE()", "=COUNT()"]',
 '=AVERAGE()', 'The AVERAGE function calculates the arithmetic mean of the values in a range', 1, 2);

-- Insert sample quiz questions for Python quiz
INSERT INTO quiz_questions (quiz_id, question, question_type, options, correct_answer, explanation, points, order_index) VALUES
('660e8400-e29b-41d4-a716-446655440002', 'What data type would you use to store a collection of unique items in Python?', 'multiple_choice',
 '["list", "tuple", "set", "dictionary"]',
 'set', 'Sets in Python automatically eliminate duplicate values and are perfect for storing unique items', 1, 1),
('660e8400-e29b-41d4-a716-446655440002', 'Which keyword is used to define a function in Python?', 'multiple_choice',
 '["function", "def", "define", "func"]',
 'def', 'The def keyword is used to define functions in Python', 1, 2);

-- Insert sample assignments
INSERT INTO assignments (course_id, title, description, instructions, max_points, file_types_allowed) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Excel Budget Project', 'Create a personal budget spreadsheet using Excel', 
 'Create a comprehensive budget spreadsheet that includes income, expenses, charts, and analysis. Use formulas, formatting, and at least one PivotTable.', 
 100, ARRAY['xlsx', 'xls']),
('550e8400-e29b-41d4-a716-446655440010', 'Python Calculator Project', 'Build a calculator application using Python',
 'Create a command-line calculator that can perform basic arithmetic operations. Include error handling and user input validation.',
 100, ARRAY['py', 'txt']);

-- Update course lesson counts
UPDATE courses SET total_lessons = (
  SELECT COUNT(*) FROM lessons WHERE lessons.course_id = courses.id AND lessons.is_published = true
) WHERE is_published = true;