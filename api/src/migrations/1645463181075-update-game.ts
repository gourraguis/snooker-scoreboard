import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateGame1645463181075 implements MigrationInterface {
  name = 'updateGame1645463181075'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "owner_id"`)
    await queryRunner.query(`ALTER TABLE "game" ADD "owner_id" character varying`)
    await queryRunner.query(`ALTER TABLE "owner" DROP COLUMN "otp"`)
    await queryRunner.query(`ALTER TABLE "owner" ADD "otp" integer`)
    await queryRunner.query(`ALTER TABLE "owner" DROP COLUMN "otp"`)
    await queryRunner.query(`ALTER TABLE "owner" ADD "otp" character varying`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "owner" DROP COLUMN "otp"`)
    await queryRunner.query(`ALTER TABLE "owner" ADD "otp" integer`)
    await queryRunner.query(`ALTER TABLE "owner" DROP COLUMN "otp"`)
    await queryRunner.query(`ALTER TABLE "owner" ADD "otp" character varying`)
    await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "owner_id"`)
    await queryRunner.query(`ALTER TABLE "game" ADD "owner_id" character varying`)
  }
}
