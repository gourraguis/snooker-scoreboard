import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateOtp1644579711644 implements MigrationInterface {
  name = 'updateOtp1644579711644'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "owner" DROP COLUMN "otp"`)
    await queryRunner.query(`ALTER TABLE "owner" ADD "otp" character varying`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "owner" DROP COLUMN "otp"`)
    await queryRunner.query(`ALTER TABLE "owner" ADD "otp" integer`)
  }
}
