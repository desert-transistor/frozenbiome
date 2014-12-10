var photoUploadController = require('./photoUploadController.js');

module.exports = function(router){
  router.post('/', photoUploadController.uploadPhoto);
  router.get('/', photoUploadController.getPhotos);
};