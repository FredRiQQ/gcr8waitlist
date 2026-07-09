module.exports = async (req,res)=>{

    if(req.mothod!=="POST"){
        return res.status(405).send("Method Not Allowed");
    }
}