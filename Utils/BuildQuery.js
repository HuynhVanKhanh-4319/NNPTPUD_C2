module.exports = {
    QueryProduct : function (objQuery){
        console.log(objQuery);
        let result = {};
        if(objQuery.name){
          result.productName = new RegExp(objQuery.name,'i');
        }
        result.price={}
        if(objQuery.price){
          if(objQuery.price.$gte){
            result.price.$gte=Number(objQuery.price.$gte);
          }else{
            result.price.$gte=0;
          }
          if(objQuery.price.$lte){
            result.price.$lte=Number(objQuery.price.$lte);
          }else{
            result.price.$lte=9999;
          }
        }else{
          result.price.$gte=0;
          result.price.$lte=9999;
        }
        console.log(result);
        return result;
      },
      QueryUser: function (objQuery) {
        console.log(objQuery);
        let result = { isDeleted: false };
    
        if (objQuery.username) {
          result.userName = new RegExp(objQuery.username, 'i');
        }
    
        if (objQuery.fullname) {
          result.fullName = new RegExp(objQuery.fullname, 'i');
        }
    
        if (objQuery.loginCount) {
          result.loginCount = {};
          if (objQuery.loginCount.$gte) {
            result.loginCount.$gte = Number(objQuery.loginCount.$gte);
          }
          if (objQuery.loginCount.$lte) {
            result.loginCount.$lte = Number(objQuery.loginCount.$lte);
          }
        }
        console.log(result);
        return result;
      }
    
}