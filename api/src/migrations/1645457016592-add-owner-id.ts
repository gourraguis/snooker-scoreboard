import { MigrationInterface, QueryRunner } from 'typeorm'

export class addOwnerId1645457016592 implements MigrationInterface {
  name = 'addOwnerId1645457016592'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "game" ADD "owner_id" character varying NOT NULL`)
    await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "finished_at" TIMESTAMP NOT NULL DEFAULT now()`)
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
    await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "finished_at" SET DEFAULT now()`)
    await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "owner_id"`)
  }
}
