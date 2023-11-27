import { User } from "../../models/index.js"

class UserSeeder {
    static async seed() {
        const userData = [
            {email: "starwarsnerd@test.com", password: "123", type: "admin"},
            {email: "glup.shitto@test.com", password: "123", type: "member"},
        ]

        for (const user of userData) {
            const currentUser = await User.query().findOne({ email: user.email})
            if (!currentUser) {
                await User.query().insert(user)
            }
        }
    }
}

export default UserSeeder