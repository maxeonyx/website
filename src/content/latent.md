<sergey-template name="published"><p><i>Published Thu 14 Apr 2022</i></p></sergey-template>
<sergey-template name="published"><p><i>Last Updated Fri 15 Apr 2022</i></p></sergey-template>
<sergey-template name="title">Latent: Ideas for a Layer 1 cryptocurrency.</sergey-template>
<sergey-template name="subtitle">An outside view "efficient markets" / "competitive field" criticism says this idea won't work, but I don't have all the technical reasons why the ideas below are bad.</sergey-template>

# Key Questions

- Why can't we give up on data availability and just rely on honest majority assumptions?
- Does Ethereum plan to use "random validator subset" sharding?
- If they do, why not use the simpler "shared security" scheme I lay out below?
- What is the state of the art in writing software with invariant confluence constraints?

# Performance

There's four aspects to performance, and in order to make a crypto with a successful performance improvement, we need to make sure none of them is a significant bottleneck. The first three people focus on are: Transactions per second, storage and bandwidth. However, there is also another one: Latency.

## 1. Latency

Latency is not often discussed in crypto spaces. Here's a little thought experiment that shows that latency is important for the long-term future of crypto.

You have a crypto wallet on your PC in New York, USA. You would like to send some $$ to your friend in Los Angeles, UK. However, you also have a crypto wallet on Musk Memorial Base, Mars. Light takes on average 20 minutes to travel to Earth from Mars. Before 20 minutes have passed, how can your friend trust your transaction? (How can he know that you haven't already spent the same coins on Mars?)

Most cryptos fail this test.

I think (?) that Ethereum 2 plans to use "random subset" validator sharding. You can see that if some of the validators are on earth and some on mars, we will need to wait 20 minutes for consensus. So ETH 2 will fail this test.

## 2. Transactions per second (TPS)

In order to get higher TPS we can to do two things:

1. Process transactions faster. I.e. Solana.
     - I won't talk about this much &mdash; in my opinion this is a straightfoward problem, although with a difficult traditional programming challenges to solve it. The gist however is that we want to rapidly linearize a transaction history. Solana is the archetypal crypto doing this well.
2. Process transactions in parallel. Ie. Sharding.
    - This is IMO the unsolved problem. We know how to model a serializable transaction model, but in order to fully take advantage of parallelism, we can't rely on having a serializeable history. We need to embrace a transaction model which is partially ordered.

So why not both? Let's shard Solana.

## 3. Storage

In order to validate a blockchain we need to store it. However, the higher the TPS the more data there is to store and validate. This can get very large.

We can solve this with roll-ups. In the database literature this is called log compaction. We remove unneeded intermediate state, instead relying on only a summary / aggregate (rollup). This can be done by someone processing a rollup transaction, which records the inputs and outputs of an entire chunk of the transaction history.

Rollups can then be nested  in a hierarchy to further reduce the storage requirements. (Level 0 is transactions, level 1 is rollups of transactions, level 2 is rollups of rollups, etc.)

If rollups are transactions, who will pulish them? In order to incentivize the creation of rollup transactions we can use a "geometric transaction fee" scheme, where the first time a transaction is processed, the validators are awarded 1/2 of the fee. The first level 1 rollup which includes a transaction will be awarded 1/4 of the fee, the first level 2 rollup 1/8 of the fee.

## 4. Bandwidth

In order to reduce bandwidth we can also use rollups. Instead of transmitting all details of a transaction history, we can transmit validated rollups.

However, this makes clearer the problem with rollups. How can we trust a roll-up when we haven't seen the original transations. If we have to validate all of the sub-transactions, we need storage and bandwidth equal to that of the raw transaction history, making roll-ups pointless.

I think the answer is the same as for sharding, and this is to rely on shared security under proof of stake.


# Sharding Proof of Stake

## Shared Security

It's possible to put a single validator (address, staked coins) at multiple physical locations (nodes, shards). We just require that they stake their coins, and in order to un-stake coins, have confirmation across all shards where they are staked. This means we can have **all** the stake on Mars (and get blocks validated with say ~80% of the stake or something) *and* have **all** the stake on Earth (also getting blocks validated with ~80% of the stake). Another way of saying it might be that the stake is "located" in a "place" that has a lower bounded latency to everywhere else equal to the minimum latency between Earth an Mars. Fraud proofs (for slashing purposes) can be published in any location, and affect the validator at all locations (since they need to coordinate to un-stake).

## Location commitments

If I am able to send some money from a wallet of which a copy physically exists on both Mars and Earth, then as a reciever on Earth there's no way to know whether or not I have double-spent my coins on Mars until you receive communication from Mars. To remedy this, we can allow funds to be pre-committed to be spent via a particular shard. If such a pre-committment is present, it means that the sender must have the funds validated by a consensus on a particular shard. On the reciever's side it doesn't matter.

## Quora

You can commit funds to a set of multiple shards and then send via *any* of them, but recieving confirmation from *all* of them is required for the receiver to get finality.

You can also do the reverse - commit funds to send via *all* of them, allowing the reciever to have finality after recieving confirmation from *any* of them.

## Trusting shards

How do we trust a shard when it doesn't have enough funds committed to it to reach the network stake threshhold? There is no solution except to involve other shards until we have enough stake to reach finality.

Which shards to involve? Ideally, the nearest ones in terms of latency, and only the minimum necessary to reach the stake threshold. How do we know which ones are the nearest in terms of latency?

## Minimum latency commitments

Two shards can communicate a minimum latency between each other and have this added to the blockchain. If they can be involved in more validation this is better for the validators on that shard because they will recieve more transaction fees, and so lower latency is better. However, if we provide a small reward for having higher latency, then we expect all trustworthy pairs to commit to the true minimum latency between each other, since they can't communicate faster than that anyway. We can have both sides send a minimum latency quote and choose the larger one as the minimum latency committment for the pair.

The result of this is that we get an on-chain graph of the shards, with the edges labeled with lower bound round-trip latencies.

## Dynamic shard graph

Anyone can add a new shard, but it will be useless at first, requiring the involvement of other shards for validating transactions. However, as more validators stake on that shard it will eventually reach independence.


## Extending sharding to smart contracts

In order to shard a chain with smart contracts, we need them to be implemented in such a way that transactions involving that smart contract can be processed in parallel. In general this is about having [Invariant Confluence](http://www.vldb.org/pvldb/vol12/p14-whittaker.pdf) between transactions. Pre-commitments can be used to segment the data model so that some kinds of transactions can be send without coordination. This is called Segmented Invariant Confluence in the paper.

If we write smart contracts in a declarative way, with events, queries and constraints as the main building block, we can use theorem proving tools to show invariant confluence between events or not. This can reveal at design time when transactions involving a smart contract are safe to parallelize (ie. the constraints of the smart contract are upheld under asynchrony).

Using a formal model for this might be over-constraining the implementations and so we can allow non-proved implementations of smart contracts too.

Smart contracts also need to be implemented in a way that allows their events to be rolled up.
