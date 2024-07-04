

-> In this project, error handling handled with express async handler

-> Schema for checkPassword


userSchema.methods.checkPassword = async function(loginPassword){
    return await bcrypt.compare(loginPassword,this.password);
}

-> function returns boolean value