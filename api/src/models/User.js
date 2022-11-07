const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        username: { 
            type: DataTypes.STRING,
            unique:true,
            allowNull: false,
            validate:{
                len:[3, 20],
                isAlphanumeric:true,
            }
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                len:[7, 31],
                isEmail:true
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                len:[8,30],
                is: function(value){
                    const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                    if(!regExp.test(value))throw new Error("The password must contain: 8-15 characters, one or multiple numbers and special characters (@, $, !, %, *, ?, &), at least a capital letter");
                }
            }
        },
        image:{
            type:DataTypes.TEXT,
            defaultValue:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAANlBMVEXk5ueutLersbTn6eqor7Lp6+y2u77h4+TIzM7N0dLR1NbU19mxt7q/xMbZ3N3c3+C6v8HCx8mJwGV6AAAFVUlEQVR4nO2d2XbjIAxAARmMd/v/f3YgSVs7kzY2CCMc3Zc50yffI7GDIgTDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMBcEQIt67NqmabtxEqAh9xdhAiBGO8vKoRy3f83S+b9fAYC6MapS8gknauxUviRAa/63+7E0jdC5vzEGEFZWv+k9JOVSF+sIYNWv4Vs5qkWUmau6kzv87o5NgWEEMG/yc03VF5equjvgd3MsLIywHBR0inPujz4ACLOzBa5RfV1KhwN1HyDoHacyFKEO0vNUYxGKdVgAC1I83MdsFOknKkRE0KPq3AZv0CZO0JFb4W/0EhlCF8SZcp5CG9UI71SWsGJMN7pSnHJ7/IqeUQylpDpFRclRj1qIKgKSoMvT3Cqv0QNSjjoMzSCihdDP3nLLvEDPeII0g1gjhtB1NvSCiNkKPTO9IOIKutVwbqEnoME2pDYmIqwpnsmt9MSEHEI3YHS5nTaARTdUA6klBuAnKbE0xVk2baG1iOoSGKqGUJpC/ObFCygN+kmaoZSEYog9oblTEdpYnFBn3d+GhEbEo4eF+1B0Nt0SjPc3w4FMV5OmK6W0DAbU5f0PPR3DNIOFVGQMdZ/GsKLT01zfMI0gG57IB2Tp9Q0vP1qkGvHpnCMC8n73F4RmbWlm3pLOzPv6q6dUK2BK50+X38VIM1woOkn6AbuJaXaECXU0n7Crf/2Tmeufrl3/hPQDTrkT3FSglaTi+rdNhB5wDemsnL7BvvVFLkmRb+7R2dBfgRlEUgunbz7gBi3eFVpKK8M10Fz9JjvexIaqINqLEpLdzB2UFxe0Vr7PIPSntF92+UOaaMXcCm+JfWFJ/xFp3NSmhIfAEKNYgqBTDN/RKEPw9iA/sOJAIYLBVSNkMVUjhD8zPdwY1VxWHR59dHZD+n3zS1ymHqrAQ38Y/B8Xxr1VlCpLdzXxF6CXPY6qGsqt2qbF8q7al1JDcSWiNmjR9L9Lqqq3ZVek84Ce7Muqgkr1y1hufm4AqLvFyEdhyFtpSGmWtr6I3gNnU09d29hbec/a/f9SeiuuKgagQW+5iKo386VnGzvMxvSPe6h9b+Zhse04uaZYrKn/8qmzg3mUnn0xEPoeR/Xz0tyaZe4PPoKXG5uhdwZ7pm3eVM62qwupLQxadNYFbk/l0u3gr/qhmahb6tvoflRuFU1n2QmykhrGQQbbrSxNUxOUdHOzQWGdrrnpagu0pqtaWDS9L0kzkgkkwDjvXeseoZKWxNYUiPZdQetg3No4e0lz/b5gd6Rj3mR1S/jAvd8DVKbL1ensLEiO4ThmcdTNOX43x/n8vRw9ps/PjeNybpcD4viufSRKndkcdXtegv5QnXawAWI+O4B3lGpPCaPucgTwTjWcEMaAivmIKJl64AguKI9G4t9Q0GNmP6+Y8jmUxrp8GIVKV11JZ22CK1SiVVXA2Xwq0lzaAKxS1hikUCQl6BQ7bEVigvjXp9CqreOB+0sY2EWCUcC80K8tmV50Dd5bb0hTMiGeHksR980WIlgl61LV10GgQilxSrKX+QLjHSbZRnjHIASRcAQlxvMTgkP9lujKCyPpHPVEPlXUub//PVXUHBztRWFKomqe6QIEo+p+p6rhhUzE/FQXIRgRRPRaF8kINUxVWhYd1QYqEtj+3UngmEh6yr0l9Icvc3/3fsJmp5CiQlkqgpYYBSVpaJrm/uojBA2JaepZJiLkET+0BSWpDHnFn6pybiICtocJ77C9IqR+XVEhDBkRi+poHMerLNLfoNlyfMzH+m3f0zhqCPbxVrAU6NTgZxiGYRiGYRiGYRiGYT6Uf/VaUTW8zb4SAAAAAElFTkSuQmCC",
            validation:{
                len:[0, 10000]
            }
        },
        playLists:{
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            validate:{
                // isInt:true
            }
        },
        subscribedTo:{
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            validate:{
                // isInt:true
            }
        },
        subscribers:{
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            validate:{
                // isInt:true
            }
        },
        premium:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        banned:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        admin:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        deleteId:{
            type:DataTypes.INTEGER
        }
    }, {
        timestamps: false,
    });
};
