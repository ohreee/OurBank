const { accounts, contract } = require('@openzeppelin/test-environment');
const Web3 = require('web3');
const { assert } = require('chai');
const { expectRevert, expectEvent, balance } = require('@openzeppelin/test-helpers');
const OurBank = contract.fromArtifact('OurBank'); // Loads a compiled contract
const ether = 10 ** 18; // 1 ether = 1000000000000000000 wei
const [owner, alice, bob] = accounts;

describe("OurBank", () => {
    it("should check that the owner is enrolled", async () => {
        bank = await OurBank.new({ from: owner });
        assert.isTrue(await bank.isEnrolled(owner, { from: owner }))
        const balanceOwner = await bank.getBalance({ from: owner })
        assert.equal(balanceOwner.toNumber(), 0)
    });

    it("should check that owner can deposit", async () => {
        bank = await OurBank.new({ from: owner });
        await bank.deposit({ from: owner, value: Web3.utils.toWei('1', 'ether') });
        const balanceOwner = await bank.getBalance({ from: owner })
        assert.equal(balanceOwner.toString(), 10 ** 18)
    });

    it("should check that not enrolled can't deposit", async () => {
        bank = await OurBank.new({ from: owner });
        await expectRevert(
            bank.deposit({ from: alice, value: Web3.utils.toWei('1', 'ether') }),
            "Only enrolled"
        );
    });

    it("should check only owner can enroll alice", async () => {
        bank = await OurBank.new({ from: owner });
        await expectRevert(
            bank.enroll(alice, {from: alice}),
            "Only owner"
        );
        const receipt = await bank.enroll(alice, {from: owner});
        expectEvent(receipt, "Enrolled", {_account: alice});
        assert.isTrue(await bank.isEnrolled(alice, { from: owner }));
    });

    it("should check only enrolled can deposit", async () => {
        bank = await OurBank.new({ from: owner });
        await expectRevert(
            bank.deposit({from: alice, value: Web3.utils.toWei('1', 'ether')}),
            "Only enrolled"
        );
        await bank.enroll(alice, {from: owner});
        assert.isTrue(await bank.isEnrolled(alice, { from: owner }));
        await bank.deposit({from: alice, value: Web3.utils.toWei('1', 'ether')});
        const balanceAlice = await bank.getBalance({ from: alice });
        assert.equal(balanceAlice.toString(), 10 ** 18);
    });

    it("should check withdraw", async () => {
        bank = await OurBank.new({ from: owner });
        await bank.enroll(alice, {from: owner});
        await bank.deposit({from: alice, value: Web3.utils.toWei('1', 'ether')});
        const balanceAlice = await bank.getBalance({ from: alice });
        assert.equal(balanceAlice.toString(), Web3.utils.toWei('1', 'ether'));
        await bank.withdraw(Web3.utils.toWei('0.5', 'ether'), {from: alice});
        const newBalanceAlice = await bank.getBalance({ from: alice });
        assert.equal(newBalanceAlice.toString(), Web3.utils.toWei('0.5', 'ether'));
    });

    it("shouldn't be possible to withdraw more than current balance", async () => {
        bank = await OurBank.new({ from: owner });
        await bank.deposit({from: owner, value: Web3.utils.toWei('1', 'ether')});
        expectRevert(
            bank.withdraw(Web3.utils.toWei('1.5', 'ether'), {from: owner}),
            "Insufficent balance"
        );
    });
});