var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
  // Check if there is an error message in the URL (e.g., /?error=...)
  const errorMessage = req.query.error;

  try {
    req.db.query('SELECT * FROM todos;', (err, results) => {
      if (err) {
        console.error('Error fetching todos:', err);
        return res.status(500).send('Error fetching todos');
      }
      // Pass the errorMessage to the view
      res.render('index', { 
        title: 'My Simple TODO', 
        todos: results, 
        error: errorMessage 
      });
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

router.post('/create', function (req, res, next) {
    const { task } = req.body;
    
    // VALIDATION: Redirect back to home with an error parameter if blank
    if (!task || task.trim().length === 0) {
      return res.redirect('/?error=Task description cannot be blank.');
    }

    try {
      req.db.query('INSERT INTO todos (task) VALUES (?);', [task.trim()], (err, results) => {
        if (err) {
          console.error('Error adding todo:', err);
          return res.status(500).send('Error adding todo');
        }
        res.redirect('/');
      });
    } catch (error) {
      console.error('Error adding todo:', error);
      res.status(500).send('Error adding todo');
    }
});

router.post('/delete', function (req, res, next) {
    const { id } = req.body;
    try {
      req.db.query('DELETE FROM todos WHERE id = ?;', [id], (err, results) => {
        if (err) {
          console.error('Error deleting todo:', err);
          return res.status(500).send('Error deleting todo');
        }
        res.redirect('/');
    });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).send('Error deleting todo');
    }
});
/* GET Edit All Page */
router.get('/edit-all', function(req, res) {
  req.db.query('SELECT * FROM todos;', (err, results) => {
    if (err) return res.status(500).send('Error');
    res.render('edit', { title: 'Edit All Tasks', todos: results, error: req.query.error });
  });
});

/* POST Update Status (Reactive Slider) */
router.post('/update-status', function(req, res) {
  const { id, completed } = req.body;
  req.db.query('UPDATE todos SET completed = ? WHERE id = ?;', [completed, id], (err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
});

/* POST Update All Task Names */
router.post('/update-all', function(req, res) {
  const { id, task } = req.body;
  const ids = Array.isArray(id) ? id : [id];
  const tasks = Array.isArray(task) ? task : [task];

  // Simple loop to update each name
  tasks.forEach((val, index) => {
    if (val.trim().length > 0) {
      req.db.query('UPDATE todos SET task = ? WHERE id = ?', [val.trim(), ids[index]]);
    }
  });
  res.redirect('/');
});

module.exports = router;