import { MigrationInterface, QueryRunner } from 'typeorm'

export class manager1644238552087 implements MigrationInterface {
  name = 'manager1644238552087'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "manager" ("id" character varying NOT NULL, "name" character varying NOT NULL, "owner" character varying NOT NULL, CONSTRAINT "PK_b3ac840005ee4ed76a7f1c51d01" PRIMARY KEY ("id"))`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "manager"`)
  }
}
