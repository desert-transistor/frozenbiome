var photoUploadController = require('./photoUploadController.js');

module.exports = function(router){
  router.post('/', photoUploadController.postPhoto);
  router.get('/', photoUploadController.getPhotos);
};