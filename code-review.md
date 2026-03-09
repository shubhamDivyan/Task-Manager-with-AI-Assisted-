# Code Review

Issue 1
React list items did not initially include a key prop.
Fix: Added key={task.id}.

Issue 2
Backend DELETE route did not check if task existed.
Fix: Added validation.

Issue 3
Fetch requests had no error handling.
Fix: Added try/catch block.