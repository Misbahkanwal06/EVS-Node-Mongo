

// const stuModel = require('../student/stuModel');

const tchModel = require('../teacher/tchModel');

const checkUserAllowedRoutes = async(id,currentUrl)=>{
    // console.log("idddd", id);

    const getuserObj = async(id)=>{
        console.log('idd', id);
        try {
            const populateRess =  await tchModel.findOne({_id:id}).populate('permissions');
            // console.log("populateRes ", populateRess);
            return   populateRess && populateRess.permissions;
        } catch (error) {
            console.log(error);
        }
    }
    const userPermissions =  await getuserObj(id);
    console.log("userPermissions response",userPermissions);
     const checkRoutes  = userPermissions && userPermissions.filter((e)=>{
        console.log( "eee",e);
       return  `/api/v2${e.route}`== currentUrl;
    })
    console.log("checkresssss",checkRoutes);
    let resp =  checkRoutes && checkRoutes.length>0?true:false;
    console.log("response", resp);
    return resp;
}

// const checkUserRoutes = async (id, url) => {
//     const getUserObj = async (id) => {
//         try {
//             const permissionObj = await stuModel.findOne({_id: id }).populate('permissions');
//             // console.log(permissionObj );
//             return permissionObj && permissionObj.permissions;
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     const userPermissions = await getUserObj(id);
//     // console.log(userPermissions);
//     console.log("permissionIds");
//     let checkRoute = userPermissions && userPermissions.filter((e)=>`/api/v2${e.route}`==url)
//     let resp =  checkRoute && checkRoute.length>0?true:false;
//     return resp;
// }
// module.exports = checkUserRoutes;

module.exports = checkUserAllowedRoutes;
