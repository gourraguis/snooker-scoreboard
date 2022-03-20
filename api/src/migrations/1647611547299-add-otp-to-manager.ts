import { MigrationInterface, QueryRunner } from 'typeorm'

export class addOtpToManager1647611547299 implements MigrationInterface {
  name = 'addOtpToManager1647611547299'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "manager" ADD "otp" character varying`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "manager" DROP COLUMN "otp"`)
  }
}
