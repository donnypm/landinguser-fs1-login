export function requireAuthentication(gssp) {
  return async (context) => {
    const { req } = context;

    // console.log(context.resolvedUrl === "/Login")

    const token = req.headers.cookie ? true : false; // Add logic to extract token from `req.headers.cookie`

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

    if (!token) {
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
