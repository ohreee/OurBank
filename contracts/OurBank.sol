// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OurBank {
    address private owner;
    struct Account {
        bool enrolled;
        uint256 balance;
    }
    event Enrolled(address _account);
    mapping(address => Account) accounts;

    constructor() {
        owner = msg.sender;
        enroll(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier onlyEnrolled() {
        require(accounts[msg.sender].enrolled == true, "Only enrolled");
        _;
    }

    modifier sufficentAmount(uint256 _amount) {
        require(_amount <= accounts[msg.sender].balance, "Insufficent balance");
        _;
    }

    function enroll(address _account) public onlyOwner {
        accounts[_account] = Account(true, 0);
        emit Enrolled(_account);
    }

    function isEnrolled(address _account) public view returns(bool) {
        return accounts[_account].enrolled;
    }

    function deposit() public payable onlyEnrolled {
        accounts[msg.sender].balance += msg.value;
    }

    function withdraw(uint256 _amount) public payable onlyEnrolled sufficentAmount(msg.value) {
        accounts[msg.sender].balance -= _amount;
        payable(msg.sender).transfer(_amount);
    }

    function getBalance() public view onlyEnrolled returns (uint256) {
        return accounts[msg.sender].balance;
    }
}
