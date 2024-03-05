import crypto from "crypto";
import Twilio from "twilio";
import User from "../Models/userModel.js";
import Jwt from "jsonwebtoken";
import Refresh from "../Models/ResfreshModel.js";
import path from "path";
import Jimp from "jimp";


const twilio = Twilio("AC03629c7ef32f4819bbe8e223d0de9548", "1381ac6012b530aff6890e9961e3171f", {
    lazyLoading: true
})

//thats the new way to manage routes which basically does the same thing

async function generateOtp() {
    const otp = crypto.randomInt(1000, 9999);
    return otp;
}

async function hashing(otp) {

    //when hashing data, createHmac encrypt a secret key inside it, which is provided by us, so whenever we try to match two hashed data, there secret key is going to be compared. 

    return crypto.createHmac('sha256', 'secret').update(otp).digest('hex');

    //digest will make sure that the returned value is in hex, while sha256 is the name of algo which is used to do hashing
}

async function sendmessage(phone) {
    return await twilio.messages.create({
        to: phone,
        from: +16504601252,
        body: "you are being watched"

    })
}



class AuthenticationController {

    async sendOtp(req, res) {
        const { phone } = req.body;
        if (!phone) {
            return res.status(400).json({
                message: "phone number is required"
            })
        }
        try {

            const otp = await generateOtp();

            const timeLimitForOtp = 1000 * 60 * 1;

            const expire = Date.now() + timeLimitForOtp;

            //we are encrypting expire time into hash to make it more secure, otherwise it would'nt be difficult for someone to change expiry in hash response when verifying OTP, again its just a measure, NOT required. 

            const DataToHash = `${expire}.${phone}.${otp}`;

            const hashed = await hashing(DataToHash);


            // await sendmessage(phone);
            return res.json({
                hash: `${hashed}.${expire}`,
                phone: phone,
                otp: otp,
                message: "message sent successfully"
            })
        } catch (error) {
            return res.status(500).json({
                message: "error while sending message!"
            })
        }
    }


    async verifyOtp(req, res) {
        const { otp, hash, phone } = req.body;

        if (!otp || !hash || !phone) {
            return res.status(400).json({
                message: "some fields are missing"
            });
        }

        const [hashed, expires] = hash.split('.');

        if (Date.now() > +expires) {
            return res.status(400).json({
                message: "OTP has already expired!"
            });
        }

        const DataToHash = `${expires}.${phone}.${otp}`


        const Newhashed = await hashing(DataToHash);

        console.log(Newhashed);

        if (Newhashed === hashed) {
            try {
                let user = await User.findOne({ phone });

                if (!user) {
                    user = await User.create({ phone });
                }

                const accessToken = Jwt.sign({ _id: user._id }, "tokennnnn", {
                    expiresIn: "4h",
                });

                const refreshToken = Jwt.sign({ _id: user._id }, "tokennnnnkrgnrelkgner", {
                    expiresIn: "1y",
                });


                await Refresh.create({
                    token: refreshToken,
                    userId: user._id
                });


                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    maxAge: 15 * 24 * 60 * 1000,
                });

                res.cookie("accessToken", accessToken, {
                    httpOnly: true,
                    maxAge: 15 * 24 * 60 * 1000,
                });

                return res.json({ auth: true, user });

            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Error occurred while processing OTP verification"
                });
            }
        } else {
            return res.status(400).json({
                message: "invalid OTP"
            });
        }
    }


    async activate(req, res) {

        try {


            const { name, avatar } = req.body;
            if (!name || !avatar) {
                return res.status(500).json({
                    message: "some fields are missing!"
                })
            }

            //since the image can be of very large size, we are resizing it using JIMP pkg

            const buffer = Buffer.from(avatar.replace(/^data:image\/jpeg;base64,/, ""), 'base64');



            // const jimpRes = await Jimp.read(buffer);






            //The Path module provides a way of working with directories and file paths.

            //The path.resolve() method is used to resolve a sequence of path segments to an absolute path.

            // const imagePath = Date.now();


            // try {


            //     jimpRes.resize(150, Jimp.AUTO).write(path.resolve(__dirname, `../storage/${imagePath}`), (err) => {
            //         if (err) {
            //             console.error('Error:', err);
            //         } else {
            //             console.log('Image resized and saved successfully.');
            //         }
            //     });
            // } catch (error) {
            //     console.log(error);
            // }


            // console.log(test);


            let user = await User.findOne({ _id: req.user });

            console.log(req.user);
            console.log(user);




            if (!user) {
                return res.status(500).json({
                    message: "User not found"
                })
            } else {

                user.activated = true;
                user.name = name;
                // user.avatar = `/storage/${imagePath}`;


                //when modifing some data, we have to  use .save();

                user.save();

                return res.status(200).json({
                    user,
                    auth: true
                });
            }

        } catch (error) {
            return res.status(500).json({
                message: "unexpected error occured in activation route"
            })
        }


    }
}













const Authentication = new AuthenticationController();

export {
    Authentication
}