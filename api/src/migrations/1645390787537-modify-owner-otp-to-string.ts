import { MigrationInterface, QueryRunner } from 'typeorm'

export class modifyOwnerOtpToString1645390787537 implements MigrationInterface {
  name = 'modifyOwnerOtpToString1645390787537'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "owner" DROP COLUMN "otp"`)
    await queryRunner.query(`ALTER TABLE "owner" ADD "otp" character varying`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "owner" DROP COLUMN "otp"`)
    await queryRunner.query(`ALTER TABLE "owner" ADD "otp" integer`)
  }
}
