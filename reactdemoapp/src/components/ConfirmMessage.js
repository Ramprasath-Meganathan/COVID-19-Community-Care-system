import React from 'react';
/**
 * Author : Ram prasath Meganathan (B00851418)
 */

const ConfirmMessage = props=>{
    return(
        <section className="alert alert-primary text-container" role="alert">
            {props.message}
        </section>
    )
}

export default ConfirmMessage
