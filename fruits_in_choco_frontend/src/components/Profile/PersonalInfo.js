import React from "react";

export const PersonalInfo = ({profile}) => {
    return <div>
        <div>Имя: {profile.firstName}</div>
        <div>Фамилия: {profile.lastName}</div>
        <div>email: {profile.email}</div>
    </div>
};