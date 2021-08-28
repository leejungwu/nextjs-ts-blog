module.exports = (sequelize:any, DataTypes:any) => {
    const User = sequelize.define('User', { // users table 생성
        email: {
            type: DataTypes.STRING(30),
            allowNull: false, // 필수
            unique: true,
        },   
        nickname: {
            type: DataTypes.STRING(30),   
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        provider: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: 'local',
        },
        snsId: {
            type: DataTypes.STRING(30),
            allowNull: true,
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci', // korean
    });

    User.associate = (db:any) => {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment, { onDelete: 'cascade', hooks: true });
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' })
    };

    return User;
}