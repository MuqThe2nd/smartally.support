// Save the job in DB.
module.exports = (job, response) => {
  job.save()
  .then(() => {
    return response.json({
      status: 0,
      message: 'Job saved.',
      job: job
    });
  })
  .catch((error) => {
    console.log(error);
    return response.json({
      status: 1,
      message: 'Failed to save the job.'
    });
  });
}
