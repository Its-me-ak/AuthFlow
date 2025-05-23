import jwt from 'jsonwebtoken';

export const generateTokensAndSetCookies = (res, userId) => {
    // Create Access Token (short-lived)
    const accessToken = jwt.sign(
        { userId },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    );

    // Create Refresh Token (long-lived)
    // const refreshToken = jwt.sign(
    //     { userId },
    //     process.env.REFRESH_TOKEN_SECRET,
    //     { expiresIn: '7d' } // 7 days
    // );

    // Set tokens as HTTP-only cookies
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        sameSite: 'strict',
    });

    // res.cookie('refreshToken', refreshToken, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production',
    //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    //     sameSite: 'strict',
    // });

    return { accessToken };
  };