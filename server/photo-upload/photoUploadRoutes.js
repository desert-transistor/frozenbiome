var photoUploadController = require('./photoUploadController.js');

module.exports = function(router){
  router.post('/', photoUploadController.post);
  router.get('/', photoUploadController.get);
};