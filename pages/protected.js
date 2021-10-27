import Cookies from "js-cookie"
import { requireAuthentication } from "../utils/useAuth"

export default function Protected(props) {
    console.log(props.data)
    const logOut = () => {
        Cookies.remove('token')
        window.location.reload()
    }
    return (
        <div style={{marginTop: "10rem"}}>
            <h1>I am protected</h1>

            <button onClick={logOut}>Log me out</button>
        </div>
    )
}

//protected route 

//higher order function -> HOC -> function yg returnnya adl sebuah function

// export const getServerSideProps = context => {
//     return {
//         props: {}
//     }
// }

export const getServerSideProps = requireAuthentication(context => {
    return {
        props: {
            data: []
        }
    }
})

// export const getServerSideProps = requireAuthentication(context => {
//     console.log('ha ', context.res)
//     // co
//     return {
//         props: {
//             data: 'sfss'
//         }
//     }
// })