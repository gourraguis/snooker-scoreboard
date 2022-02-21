import {MigrationInterface, QueryRunner} from "typeorm";

export class addCreatedDate1645454945347 implements MigrationInterface {
    name = 'addCreatedDate1645454945347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "finished_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "owner" DROP COLUMN "otp"`);
        await queryRunner.query(`ALTER TABLE "owner" ADD "otp" integer`);
        await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "finished_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "owner" DROP COLUMN "otp"`);
        await queryRunner.query(`ALTER TABLE "owner" ADD "otp" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "owner" DROP COLUMN "otp"`);
        await queryRunner.query(`ALTER TABLE "owner" ADD "otp" integer`);
        await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "finished_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "owner" DROP COLUMN "otp"`);
        await queryRunner.query(`ALTER TABLE "owner" ADD "otp" character varying`);
        await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "finished_at" DROP DEFAULT`);
    }

}
