module.exports = (sequelize: any, DataTypes: any) => {
    const Post = sequelize.define('Post', { // posts table 생성
        title: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // korean
    });

    Post.associate = (db: any) => {
        db.Post.belongsTo(db.User);  // post.addUser
        db.Post.hasMany(db.Comment);
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' })  // post.addLikers, post.removeLikers
    };
    return Post;
}