import express from 'express';
const app = express();

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

const port = process.env.PORT || 8000;
if (require.main === module) {
  app.listen(port, () => {
    return console.log(`BrieflyPlanningPoker app listening at ${port} port`);
  });
}

export = app;
