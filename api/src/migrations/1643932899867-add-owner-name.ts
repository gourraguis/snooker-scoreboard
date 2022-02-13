import { MigrationInterface, QueryRunner } from 'typeorm'

export class addOwnerName1643932899867 implements MigrationInterface {
  name = 'addOwnerName1643932899867'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "owner" ADD "name" character varying NOT NULL`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "owner" DROP COLUMN "name"`)
  }
}
