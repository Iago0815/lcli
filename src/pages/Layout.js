import React from "react";

export default function Layout({

    title = 'Title',
    description = 'Description',
    className,
    children }) {

    return (

        <div>
            <div className="jumbotron">

                <h2>{title}</h2>
                <p className="lead">{description}</p>

            </div>
            <div className={className}>{children}</div>

        </div>
    )
}