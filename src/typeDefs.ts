
import { gql } from "apollo-server-express"

const typeDefs = gql`

    type User {
        username: String
        email: String
        password: String
    }

    type Query {
        users: [User]
    }

    type Mutation {
        createUser( username: String, password: String, email: String ) :User
    }

`;

export default typeDefs;