import { MigrationInterface, QueryRunner } from 'typeorm'

export class addDetailsOwnerTable1649567258505 implements MigrationInterface {
  name = 'addDetailsOwnerTable1649567258505'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "owner" ADD "club_name" character varying`)
    await queryRunner.query(`ALTER TABLE "owner" ADD "address" character varying`)
    await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "owner_id" SET NOT NULL`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "owner_id" DROP NOT NULL`)
    await queryRunner.query(`ALTER TABLE "owner" DROP COLUMN "address"`)
    await queryRunner.query(`ALTER TABLE "owner" DROP COLUMN "club_name"`)
  }
}
