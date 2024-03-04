import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1707359185145 implements MigrationInterface {
    name = 'Init1707359185145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "finance" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "finance_income" integer NOT NULL, "finance_residual" integer NOT NULL, CONSTRAINT "PK_e748b2c24804fde15d4d6d0e408" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "finance"`);
    }

}
