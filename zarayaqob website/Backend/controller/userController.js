const userregister = async (req,res) =>{
    const {username, email, firstname, lastname, password } = req.body;
    console.log("check")
// ---------------------------------------------------------------------------------------------------
if(!username||!email||!firstname||!lastname||!password)
    return res.status(201).json({msg:"It cannot be a blank fields."})
// ---------------------------------------------------------------------------------------------------
if(password.length<8)
    return res.status(201).json({msg:"The password cannot be less than 8."})
// ---------------------------------------------------------------------------------------------------


const [user] = await db.query("select username, email from users where username = ? or email = ?",[username, email])

if(user.length>0)
    return res.status(201).json({msg:"There's the same username or email.",user: user })
// ---------------------------------------------------------------------------------------------------

const salt = await bcrypt.genSalt(10);
const hashpass = await bcrypt.hash(password,salt);
// ---------------------------------------------------------------------------------------------------

try{
    await db.query("insert into users (username,firstname,lastname,email,password) values (?,?,?,?,?)" ,[username,firstname,lastname,email,hashpass])
    return res.status(200).json({ msg: "user registred successfully`````````" });

}catch(err){
    return res.json({msg:"something went wrong, try again"});
}
}