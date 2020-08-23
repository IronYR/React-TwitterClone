import React from 'react'
import { Route, Redirect } from 'react-router'

export default function ProtectedRoutes({component: Component, ...rest}) {
    console.log(rest)
    return (
        <Route render={()=>{
            if(rest.isAuth.toString() == "true"){
                return <Component {...rest} exact={true}/>
            } else if(rest.isAuth.toString() == "false"){
                return (
                    <Redirect to={{
                        pathname: "/",
                        state: {
                            from: rest.location
                        }
                    }}
                    />
                )
            }}
        }
        />
        )
}
