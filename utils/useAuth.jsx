import cookie from "cookie";

export function requireAuthentication(gssp) {
  return async (context) => {
    const { req } = context;

    // console.log(context.resolvedUrl === "/Login")

    let isLogin = false;

    if (req.headers.cookie) {
      const isTokenCorrect = cookie.parse(req.headers.cookie);

      if (isTokenCorrect.token) {
        isLogin = true;
      } else {
        isLogin = false;
      }
    }

    // console.log(req?.headers)

    // if (pa)

    // if (context.resolvedUrl === "/Login" && token) {
    //     return {
    //         redirect: {
    //             destination: '/',
    //             statusCode: 302
    //         }
    //     };
    // }

    if (!isLogin) {
      // Redirect to login page
      return {
        redirect: {
          destination: "/Login",
          statusCode: 302,
        },
      };
    }

    return await gssp(context); // Continue on to call `getServerSideProps` logic
  };
}

//order tertinggi dari semua function ->  hoc

//duluan function ini jalan drpd browser render component react yg kita buat
