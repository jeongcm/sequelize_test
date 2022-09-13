// @ts-ignore
import {Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface IResource {
    resourceKey: number;
    resourceId: string;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    resourceName: string;
    resourceDescription: string;
    resourceLevelType: string;
}

export class ResourceModel extends Model<IResource> implements IResource {
  public resourceKey: number;
  public resourceId: string;
  public createdBy: string;
  public updatedBy: string;
  public readonly createdAt!: Date;
  public updatedAt: Date;
  public deletedAt: Date;
  public resourceName: string;
  public resourceDescription: string;
  public resourceLevelType: 'KN' | 'KS' | 'OP' | 'KC';
}

export default function (sequelize: Sequelize): typeof ResourceModel {
    ResourceModel.init(
        {
            resourceKey: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            resourceId: {
                allowNull: false,
                type: DataTypes.STRING(100),
                unique: true,
            },
            createdBy: {
                allowNull: false,
                type: DataTypes.STRING(16),
            },
            updatedBy: {
                type: DataTypes.STRING(16),
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                type: DataTypes.DATE,
            },
            deletedAt: {
                type: DataTypes.DATE,
            },
            resourceName: {
                allowNull: false,
                type: DataTypes.STRING(500),
            },
            resourceDescription: {
                allowNull: false,
                type: DataTypes.STRING(500),
            },
            resourceLevelType: {
                type: DataTypes.STRING(2),
                validate: {
                    isIn: {
                        args: [['', 'KN', 'KS', 'OP', 'K8']],
                        msg: 'Resource must be of type KN, KS or OP.',
                    },
                },
            },
        },
        {
            indexes: [
                {
                    name: 'unique_index',
                    unique: true,
                    fields: ['deletedAt'],
                },
            ],
            tableName: 'Resource',
            modelName: 'Resource',
            sequelize,
        },
    );

    return ResourceModel;
}