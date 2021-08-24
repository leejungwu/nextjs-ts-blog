module.exports = (sequelize:any, DataTypes:any) => {
    const Comment = sequelize.define('Comment', { // comments table 생성
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci', // korean
    });

    Comment.associate = (db:any) => {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
        db.Comment.belongsTo(db.Comment, { as: 'responseTo' })
    };
    return Comment;
} 