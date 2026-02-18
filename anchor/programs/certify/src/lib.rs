use anchor_lang::prelude::*;

declare_id!("HEYaFCGw2M4W9xnrXxzoByfQhHr5uRMHiYGM5MoQPKq4");

#[program]
pub mod certify {
    use super::*;

    pub fn issue_certificate(
        ctx: Context<IssueCertificate>,
        recipient: Pubkey,
        metadata_hash: String,
    ) -> Result<()> {
        let certificate = &mut ctx.accounts.certificate;

        certificate.issuer = ctx.accounts.issuer.key();
        certificate.recipient = recipient;
        certificate.metadata_hash = metadata_hash;

        Ok(())
    }
}

#[account]
pub struct Certificate {
    pub issuer: Pubkey,
    pub recipient: Pubkey,
    pub metadata_hash: String,
}

#[derive(Accounts)]
#[instruction(recipient: Pubkey, metadata_hash: String)]
pub struct IssueCertificate<'info> {
    #[account(
        init,
        payer = issuer,
        space = 8 + 32 + 32 + 4 + 512
    )]
    pub certificate: Account<'info, Certificate>,

    #[account(mut)]
    pub issuer: Signer<'info>,
    pub system_program: Program<'info, System>,
}
