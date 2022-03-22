import { MigrationInterface, QueryRunner } from 'typeorm'

export class removeOtp1647947430238 implements MigrationInterface {
  name = 'removeOtp1647947430238'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "manager" DROP COLUMN "otp"`)
    await queryRunner.query(`ALTER TABLE "owner" DROP COLUMN "otp"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "owner" ADD "otp" character varying`)
    await queryRunner.query(`ALTER TABLE "manager" ADD "otp" character varying`)
  }
}
