import { BehindSceneRole } from "../../models/index.js"

class BehindSceneRoleSeeder {
    static async seed() {
        const rolesData = [
            {contributorId: 1, mediaId: 1, role: "director"},
            {contributorId: 1, mediaId: 1, role: "writer"},
            {contributorId: 2, mediaId: 2, role: "director"},
            {contributorId: 1, mediaId: 2, role: "writer"},
            {contributorId: 4, mediaId: 2, role: "writer"},
            {contributorId: 5, mediaId: 2, role: "writer"},
            {contributorId: 3, mediaId: 3, role: "director"},
            {contributorId: 1, mediaId: 3, role: "writer"},
            {contributorId: 5, mediaId: 3, role: "writer"},
            {contributorId: 1, mediaId: 4, role: "director"},
            {contributorId: 1, mediaId: 4, role: "writer"},
            {contributorId: 1, mediaId: 5, role: "director"},
            {contributorId: 1, mediaId: 5, role: "writer"},
            {contributorId: 6, mediaId: 5, role: "writer"},
            {contributorId: 1, mediaId: 6, role: "director"},
            {contributorId: 1, mediaId: 6, role: "writer"},
        ]

        for (const role of rolesData) {
            const currentRole = await BehindSceneRole.query().findOne({ contributorId: role.contributorId, mediaId: role.mediaId, role: role.role  })
            if (!currentRole) {
                await BehindSceneRole.query().insert(role)
            }
        }
    }
}

export default BehindSceneRoleSeeder