var photoUploadController = require('./photoUploadController.js');

module.exports = function(router){
  router.post('/', photoUploadController.photoRouter.post);
  router.get('/', photoUploadController.getPhotos);
};