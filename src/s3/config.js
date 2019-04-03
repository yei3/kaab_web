import CLI from 'aws-sdk'


export default class S3Kaab {
  constructor () {
    var albumBucketName = 'kaab-files';
    var bucketRegion = 'us-west-2';
    var IdentityPoolId = 'us-west-2:f5bbfac2-31ea-47ae-8eaa-a1daec1255e7';

    CLI.config.update({
      region: bucketRegion,
      credentials: new CLI.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
      })
    });
     this.client = new CLI.S3({
      apiVersion: '2006-03-01',
      params: {Bucket: albumBucketName}
    });
  }

   uploadInitialBase(file,filename,cb){
     this.client.upload({
      Key:'bases/' + filename,
      Body: file,
      ACL: 'public-read'
    },cb);
  }

  uploadAssetFile(file,filename,cb){
    this.client.upload({
      Key:'asseetFiles/' + filename,
      Body: file,
      ACL: 'public-read'
    },cb);
  }
  /*
  async uploadInitialBase(file,filename){
    await this.client.upload({
      Key:'bases/' + filename,
      Body: file,
      ACL: 'public-read'
    },function(err, data) {
      if (err) {
        return false;
      }
      console.info(data)
      return data.Location
    });

  }*/
}
