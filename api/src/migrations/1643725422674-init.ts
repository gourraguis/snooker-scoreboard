import { MigrationInterface, QueryRunner } from 'typeorm'

export class init1643725422674 implements MigrationInterface {
  name = 'init1643725422674'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "owner" ("phone_number" character varying NOT NULL, "otp" character varying, "balance" integer NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_478ef5b9505a12c4ae447145713" PRIMARY KEY ("phone_number"))`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "owner"`)
  }
}
